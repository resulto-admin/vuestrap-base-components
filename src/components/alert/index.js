// import dependencies
import template from './alert.html'

// export component object
export default {
  template: template,
  replace: true,
  computed: {
    alertState() {
      return !this.state || this.state === `default` ? `alert-success` : `alert-${this.state}`
    },
    alertClass: function() {
      var dismissible = this.dismissible ? 'alert-dismissible' : ''
      return `alert ${this.alertState} ${dismissible} fade show`
    }
  },
  data: function() {
    return {
      internalShow: this.show
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    state: {
      type: String,
      default: 'success'
    },
    dismissible: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    dismiss: function dismiss() {
      // hide an alert
      this.internalShow = false
        // Dispatch an event from the current vm that propagates all the way up to its $root
        // Replace by bus if needed.
    },
  }
}
