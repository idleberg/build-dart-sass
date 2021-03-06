import meta from '../package.json';

export const configSchema = {
  pathToSass: {
    title: 'Path to Sass',
    description: 'Specify a custom path to the `sass` binary',
    type: 'string',
    default: 'sass',
    order: 0,
  },
  customArguments: {
    title: 'Custom Arguments',
    description:
      'Specify your preferred arguments for Sass, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders',
    type: 'string',
    default: '--style expanded {FILE_ACTIVE} {FILE_ACTIVE_NAME_BASE}.css',
    order: 1,
  },
  manageDependencies: {
    title: 'Manage Dependencies',
    description:
      'When enabled, third-party dependencies will be installed automatically',
    type: 'boolean',
    default: true,
    order: 2,
  },
  alwaysEligible: {
    title: 'Always Eligible',
    description:
      'The build provider will be available in your project, even when not eligible',
    type: 'boolean',
    default: false,
    order: 3,
  },
};

export function getConfig(key) {
  return atom.config.get(`${meta.name}.${key}`);
}
