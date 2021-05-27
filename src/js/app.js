window.constants = {
    is_locomotive: false,
    enabled_legacy_browser: false,
}
import {default as Common} from './common';
import Top from './top';
import Barba from './barba';

let common = new Common();
new Top();
common.load();
new Barba();




