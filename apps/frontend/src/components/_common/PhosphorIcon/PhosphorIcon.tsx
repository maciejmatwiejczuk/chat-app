import { lazy, Suspense, forwardRef, memo } from 'react';
import type { IconProps } from '@phosphor-icons/react';

type ImportMap = Record<
  string,
  (name: string) => Promise<{ default: React.ComponentType<IconProps> }>
>;

const importMap: ImportMap = Object.entries(
  import.meta.glob(
    '../../../../../../node_modules/@phosphor-icons/react/dist/ssr/*.mjs'
  )
).reduce((acc, [path, fn]) => {
  acc[path] = (name: string) =>
    fn().then((mod) => {
      const typedMod = mod as Record<string, React.ComponentType<IconProps>>;
      return { default: typedMod[name] };
    });
  return acc;
}, {} as ImportMap);

function relativePathForIcon(name: string): string {
  return `../../../../../../node_modules/@phosphor-icons/react/dist/ssr/${name}.mjs`;
}

const PhosphorIcon = memo(
  forwardRef<SVGSVGElement, IconProps & { name: string }>((props, ref) => {
    const { name, ...iconProps } = props;

    const Icon = lazy(() => importMap[relativePathForIcon(name)](name));

    return (
      <Suspense fallback={null}>
        <Icon {...iconProps} ref={ref} />
      </Suspense>
    );
  })
);

export default PhosphorIcon;
