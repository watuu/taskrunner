window.constants = {
    enabled_legacy_browser: false,
}
import {default as Common} from './common';
// import Barba from './barba';
import Top from './top';
import BudouX from './budoux';

const common = new Common();
common.load();
// new Barba();
new Top();
new BudouX();
