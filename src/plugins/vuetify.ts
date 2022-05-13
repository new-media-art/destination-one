

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md'
      },
    theme: {
        themes: {
          light: {
            magenta:    '#F0268E',
            mystic:     '#D65780',
            pink:       '#F7D1CD',
            yellow:     '#F3DA5D',
            green:      '#42FCD0',
            blue:       '#2974E4',
            lightblue:  '#0191F1',
            turquoise:  '#6DD6DA',
          },
        },
      },
    
});

