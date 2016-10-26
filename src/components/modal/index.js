// import dependencies
import {csstransitions} from '../../utils/helpers.js'
import template from './modal.html'

// import polyfill for IE9
import '../../utils/ie9_polyfill.js'

// this is directly linked to the bootstrap animation timing in _modal.scss
// // for browsers that do not support transitions like IE9 just change slide immediately
const TRANSITION_DURATION = csstransitions() ? 300 : 0

// export component object
export default {
  template: template,
  replace: true,
  data() {
    return {
      animateBackdrop: false,
      animateModal: false,
    }
  },
  computed: {
    outerClasses: function() {
      return {
        fade: this.fade,
        in: this.animateModal || !this.fade
      }
    },
    innerClasses: function() {
        return `modal-dialog  modal-${this.size}`
    },
    backdropClasses: function() {
      return {
        fade: this.fade,
        in: this.animateBackdrop || !this.fade
      }
    },
  },
  props: {
    id: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'md'
    },
    fade: {
      type: Boolean,
      default: true
    },
    closeOnBackdrop: {
      type: Boolean,
      default: true,
    },
    eventHub: {
      type: Object,
      required: true
    }
  },
  methods: {
    showModal(id) {
      if (this.id === id) {
        this.show()
      }
    },
    hideModal(id) {
      if (this.id === id) {
        this.hide()
      }
    },
    show() {
      this.$el.style.display = 'block'
      this._body = document.querySelector('body')
      const _this = this
      // wait for the display block, and then add class "in" class on the modal
      this._modalAnimation = setTimeout(() => {
        _this.animateBackdrop = true
        this._modalAnimation = setTimeout(() => {
          _this._body.classList.add('modal-open')
          _this.animateModal = true
        }, (_this.fade) ? TRANSITION_DURATION : 0)
      }, 0)
    },
    hide() {
      const _this = this
      // first animate modal out
      this.animateModal = false
      this._modalAnimation = setTimeout(() => {
        // wait for animation to complete and then hide the backdrop
        _this.animateBackdrop = false
        this._modalAnimation = setTimeout(() => {
          _this._body.classList.remove('modal-open')
          // no hide the modal wrapper
          _this.$el.style.display = 'none'
        }, (_this.fade) ? TRANSITION_DURATION : 0)
      }, (_this.fade) ? TRANSITION_DURATION : 0)
    },
    onClickOut(e) {
      // if backdrop clicked, hide modal
      if (this.closeOnBackdrop && e.target.id && e.target.id === this.id) {
        this.hide()
      }
    },
  },
  created: function() {
    this.eventHub.$on('show::modal', this.showModal)
    this.eventHub.$on('hide::modal', this.hideModal)
  },
  mounted: function () {
    this.$nextTick(function () {
      document.addEventListener('keydown', (e) => {
        const key = e.which || e.keyCode
        if (key === 27) { // 27 is esc
          this.hide()
        }
      })
    })
  },
  beforeDestroy: function() {
    this.eventHub.$off('show::modal', this.showModal)
    this.eventHub.$off('hide::modal', this.hideModal)
  },
  destroyed: function() {
    clearTimeout(this._modalAnimation)
  },
}
