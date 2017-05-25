import vConsole from 'vConsole';
import VConsoleExtendTab from './extend/extend.js';

const extendTab = new VConsoleExtendTab('extend', 'Extend');
vConsole.addPlugin(extendTab);

export default vConsole;