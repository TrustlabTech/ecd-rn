/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto@novalab.io>
 */

import app from './src/app'
import { loadIcons } from './src/constants'

loadIcons().then(app)
