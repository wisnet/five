/**
 * WordPress dependencies
 */
import { createContext } from '@wordpress/element';
/**
 * Internal dependencies
 */

import defaultRegistry from '../../default-registry';

var _createContext = createContext(defaultRegistry),
    Consumer = _createContext.Consumer,
    Provider = _createContext.Provider;

export var RegistryConsumer = Consumer;
export default Provider;
//# sourceMappingURL=index.js.map