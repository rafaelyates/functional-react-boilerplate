import { Environment } from '@app/shared/models/environment.model';

/**
 * Load the required variables from process environment
 * and/or other places.
 * Here you can place the values for your app from the
 * multiple sources or any default values.
 */
const environment: Partial<Environment> = {
  NODE_ENV: process.env.NODE_ENV,
};

export { environment };
