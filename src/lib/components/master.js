import React, { Component }   from 'react'
import { renderToString }     from 'react-dom/server'
import { map }                from 'lodash'
import serialize              from 'serialize-javascript'

export default class Master extends Component {

  static defaultProps = {
    title: 'Blockr',
    meta: {
      viewport: 'width=device-width, initial-scale=1',
      description: 'Hey bro, I heard you like widgets so I put some widgets in your widgets.',
      keywords: ['Blocks', 'Widgets', 'Components', 'Oh my!'].join(', '),
      author: 'Jon Jaques'
    },
    links: [
      'https://s3.amazonaws.com/blockr-client-assets/css/main.css'
    ],
    scripts: [
      'https://s3.amazonaws.com/blockr-client-assets/js/main.js'
    ],
    state: {}
  }

  renderMetaInfo() {
    let count = 0
    return map(this.props.meta, (content, name)=> {
      count++
      const props = { name, content }
      return <meta key={`meta-${count}`} {...props} />
    })
  }

  renderLinks() {
    let count = 0
    return map(this.props.links, (href)=> {
      count++
      return <link key={`link-${count}`} rel="stylesheet" href={href} />
    })
  }

  renderScripts() {
    let count = 0
    return map(this.props.scripts, (src)=> {
      count++
      return <script defer key={`script-${count}`} src={src}></script>
    })
  }

  renderTitle() {
    return <title>{this.props.title}</title>
  }

  renderApplication() {
    const component = this.props.component
      ? renderToString(this.props.component)
      : ''
    return <div id="application" dangerouslySetInnerHTML={{
      __html: component
    }} />
  }

  renderState() {
    return <script dangerouslySetInnerHTML={{
      __html: `__STATE__=${serialize(this.props.state)};`
    }} />
  }

  renderInlineCss() {
    if (this.props.inlineCss) {
      return <style dangerouslySetInnerHTML={{
        __html: this.props.inlineCss
      }} />
    }
  }

  render() {
    return <html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {this.renderInlineCss()}
        {this.renderMetaInfo()}
        {this.renderTitle()}
        {this.renderLinks()}
      </head>
      <body>
        {this.renderApplication()}
        {this.renderState()}
        {this.renderScripts()}
      </body>
    </html>
  }

}