// import dependencies
import template from './collapse.html'
import {csstransitions} from '../../utils/helpers.js'

// import polyfill for IE9
import '../../utils/ie9_polyfill.js'

// for browsers that do not support transitions like IE9 just change immediately
const TRANSITION_DURATION = csstransitions() ? 350 : 0

// export component object
export const collapse = {
  template: template,
  replace: true,
  props: {
    id: {
      type: String,
      default: '',
    },
    group: {
      type: String,
      default: '',
    },
    eventHub: {
      type: Object,
      required: true
    },
    initiallyOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    show() {
      this.$el.classList.remove('collapse')
      const height = this.$el.scrollHeight
      this.$el.classList.add('collapsing')
      this.$el.offsetWidth
      this.$el.style.height = height + 'px'
      this._collapseAnimation = setTimeout(()=> {
        this.$el.classList.remove('collapsing')
        this.$el.classList.add('collapse', 'show')
      }, TRANSITION_DURATION)
    },
    hide() {
      this.$el.classList.remove('collapse')
      this.$el.classList.remove('show')
      this.$el.classList.add('collapsing')
      this.$el.offsetWidth
      this.$el.style.height = '0px'
      this._collapseAnimation = setTimeout(()=> {
        this.$el.classList.remove('collapsing')
        this.$el.classList.add('collapse')
      }, TRANSITION_DURATION)
    },
    collapse(data) {
      if (data.id && data.id === this.id && !data.group || data.group && data.group === this.group && !data.id) {
        if ((this.$el.className + ' ').indexOf(' show ') > -1) {
          this.hide()
        } else {
          this.show()
        }
      }
    },
    accordion(data) {
      // if id and group id is provided it means it is an accordion and takes priority over all
      if (data.id && data.group && data.group === this.group) {
        // for current element
        if (data.id === this.id) {
          // collapse if selected item is already opened
          if ((this.$el.className + ' ').indexOf(' show ') > -1) {
            this.hide()
          } else {
            this.show()
          }
        } else {
          // ignore if non-selected item is already closed
          if ((this.$el.className + ' ').indexOf(' show ') === -1) return

           // close all items in the group, and open the one selected
          this.hide()
        }
      }
    }
  },
  created: function() {
    this.eventHub.$on('toggled::collapse', this.collapse)
    this.eventHub.$on('toggled::accordion', this.accordion)
  },
  mounted: function() {
    this.$nextTick(function() {
      if (this.initiallyOpen) {
        this.$el.classList.add('show');
        const height = this.$el.scrollHeight
        this.$el.style.height = height + 'px'
      }
    })
  },
  beforeDestroy: function() {
    clearTimeout(this._collapseAnimation)
    this.eventHub.$off('toggled::collapse', this.collapse)
    this.eventHub.$off('toggled::accordion', this.accordion)
  }
}

// export component object
export const collapseToggle = {
  template: '<span v-on:click.stop.prevent="toggle($event)"><slot></slot></span>',
  replace: true,
  computed: {

  },
  props: {
    target: {
      type: String,
      default: ''
    },
    targetGroup: {
      type: String,
      default: ''
    },
    eventHub: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggle() {
      // if both attributes missing, ignore
      if (!this.target && !this.targetGroup) return

      // broadcast accordion toggle if both id and group are set otherwise broadcast collapse
      // we also use dispatch to tell other components about the change
      if (this.target && this.targetGroup) {
        this.eventHub.$emit('toggled::accordion', {id: this.target, group: this.targetGroup})
      } else {
        this.eventHub.$emit('toggled::collapse', {id: this.target, group: this.targetGroup})
      }
    }
  },
}
