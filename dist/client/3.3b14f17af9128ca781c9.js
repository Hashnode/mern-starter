webpackJsonp([3],{516:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e){return{showAddPost:(0,P.getShowAddPost)(e),posts:(0,g.getPosts)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,n,r){var l=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&l)for(var i in l)void 0===o[i]&&(o[i]=l[i]);else o||(o=l||{});if(1===a)o.children=r;else if(a>1){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),u=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),f=o(6),c=(n(f),o(10)),d=n(c),p=o(81),v=o(700),h=n(v),y=o(702),m=n(y),b=o(182),_=o(189),P=o(190),g=o(183),w=function(e){function t(){var e,o,n,a;r(this,t);for(var i=arguments.length,s=Array(i),u=0;u<i;u++)s[u]=arguments[u];return o=n=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.handleDeletePost=function(e){confirm("Do you want to delete this post")&&n.props.dispatch((0,b.deletePostRequest)(e))},n.handleAddPost=function(e,t,o){n.props.dispatch((0,_.toggleAddPost)()),n.props.dispatch((0,b.addPostRequest)({name:e,title:t,content:o}))},a=o,l(n,a)}return a(t,e),u(t,[{key:"componentDidMount",value:function(){this.props.dispatch((0,b.fetchPosts)())}},{key:"render",value:function(){return s("div",{},void 0,s(m.default,{addPost:this.handleAddPost,showAddPost:this.props.showAddPost}),s(h.default,{handleDeletePost:this.handleDeletePost,posts:this.props.posts}))}}]),t}(f.Component);w.need=[function(){return(0,b.fetchPosts)()}],w.contextTypes={router:d.default.object},t.default=(0,p.connect)(i)(w)},567:function(e,t){e.exports={"single-post":"_2wFZUrnLLPIM2UvuNgnV1r","post-title":"_1BU3HyU1b5fh1tsPA9MtRq","author-name":"_2pYEGhQRMs0Mh9CsoJsCrq","post-desc":"_2hG8tPFCGI0k7BZ5cz9nnH","post-action":"_37qYFcYfJHxrTH_bV6-TQo",divider:"_3H_6OlXO_Hx_93avyoPoZ2","post-detail":"_16xorg78DM6DwmPTBglw02"}},700:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e){return l("div",{className:"listView"},void 0,e.posts.map(function(t){return l(u.default,{post:t,onDelete:function(){return e.handleDeletePost(t.cuid)}},t.cuid)}))}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,n,r){var l=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&l)for(var i in l)void 0===o[i]&&(o[i]=l[i]);else o||(o=l||{});if(1===a)o.children=r;else if(a>1){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),a=o(6),i=(n(a),o(10)),s=(n(i),o(701)),u=n(s);t.default=r},701:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e){return l("div",{className:c.default["single-post"]},void 0,l("h3",{className:c.default["post-title"]},void 0,l(s.Link,{to:"/posts/"+e.post.slug+"-"+e.post.cuid},void 0,e.post.title)),l("p",{className:c.default["author-name"]},void 0,d," ",e.post.name),l("p",{className:c.default["post-desc"]},void 0,e.post.content),l("p",{className:c.default["post-action"]},void 0,l("a",{href:"#",onClick:e.onDelete},void 0,p)),l("hr",{className:c.default.divider}))}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,n,r){var l=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&l)for(var i in l)void 0===o[i]&&(o[i]=l[i]);else o||(o=l||{});if(1===a)o.children=r;else if(a>1){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),a=o(6),i=(n(a),o(10)),s=(n(i),o(79)),u=o(80),f=o(567),c=n(f),d=l(u.FormattedMessage,{id:"by"}),p=l(u.FormattedMessage,{id:"deletePost"});t.default=r},702:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.PostCreateWidget=void 0;var i=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,n,r){var l=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&l)for(var i in l)void 0===o[i]&&(o[i]=l[i]);else o||(o=l||{});if(1===a)o.children=r;else if(a>1){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),s=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),u=o(6),f=n(u),c=o(10),d=(n(c),o(80)),p=o(703),v=n(p),h=i(d.FormattedMessage,{id:"createNewPost"}),y=i(d.FormattedMessage,{id:"submit"}),m=t.PostCreateWidget=function(e){function t(){var e,o,n,a;r(this,t);for(var i=arguments.length,s=Array(i),u=0;u<i;u++)s[u]=arguments[u];return o=n=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.addPost=function(){var e=n.refs.name,t=n.refs.title,o=n.refs.content;e.value&&t.value&&o.value&&(n.props.addPost(e.value,t.value,o.value),e.value=t.value=o.value="")},a=o,l(n,a)}return a(t,e),s(t,[{key:"render",value:function(){var e=v.default.form+" "+(this.props.showAddPost?v.default.appear:"");return i("div",{className:e},void 0,i("div",{className:v.default["form-content"]},void 0,i("h2",{className:v.default["form-title"]},void 0,h),f.default.createElement("input",{placeholder:this.props.intl.messages.authorName,className:v.default["form-field"],ref:"name"}),f.default.createElement("input",{placeholder:this.props.intl.messages.postTitle,className:v.default["form-field"],ref:"title"}),f.default.createElement("textarea",{placeholder:this.props.intl.messages.postContent,className:v.default["form-field"],ref:"content"}),i("a",{className:v.default["post-submit-button"],href:"#",onClick:this.addPost},void 0,y)))}}]),t}(u.Component);t.default=(0,d.injectIntl)(m)},703:function(e,t){e.exports={form:"_1_WEV3z8MyISJ_IVeQGbfN","form-content":"_3CPctdi6XIS37va2ubmlCG","form-title":"_1CSMUfhA4ysKjSED0EfzhX","form-field":"_2UV8G3K76UKXYl2G9ov3yn","post-submit-button":"_1atG94QrpmrK4ei1Y4lDc3",appear:"_38mS7lSZiNDV5iEXieRUC7"}}});