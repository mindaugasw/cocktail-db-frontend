// FontAwesome in Vue guide: https://stackoverflow.com/questions/66389974/using-font-awesome-in-vue-3

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faMartiniGlassCitrus,
} from '@fortawesome/free-solid-svg-icons';

library.add(faMartiniGlassCitrus);

export default FontAwesomeIcon;
