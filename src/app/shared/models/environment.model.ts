/**
 * Maps all properties for type safety.
 * The values from your system environment. Eg:
 * - NODE_ENV
 * - VCAP_SERVICES
 * The values that the user might place in both:
 * - ${PROJECT_ROOT}/env/.env.development
 * - ${PROJECT_ROOT}/env/.env.production
 */
export interface Environment extends NodeJS.ProcessEnv {
  readonly NODE_ENV: string;
}
