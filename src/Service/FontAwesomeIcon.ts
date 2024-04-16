// FontAwesome in Vue guide: https://stackoverflow.com/questions/66389974/using-font-awesome-in-vue-3

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faArrowUpRightFromSquare,
    faCaretLeft,
    faMartiniGlassCitrus,
    faCartShopping,
    faCartPlus,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faArrowUpRightFromSquare,
    faCaretLeft,
    faMartiniGlassCitrus,
    faCartShopping,
    faCartPlus,
);

export default FontAwesomeIcon;
