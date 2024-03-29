<div align="center">
  <h1>react-router-document-title</h1>
  
  Composable HOC for easily updating `document.title` on location change
</div>

## What it does

Automatically updates the tab (`document.title`) on component mount and subsequent location updates (for SPAs using react-router). Just wrap your top-level router components using the `withDocumentTitle` higher-order component.


## Installation

```JS
npm install --save react-router-document-title
```

## Usage

```JS
withDocumentTitle('About Us')(AboutPage)
```

<span>or</span>

```JS
withDocumentTitle(getTitle)(AboutPage)
```

## Examples

### With basic React components

```JSX

import withDocumentTitle from 'react-router-document-title';

class ClientPage extends React.Component {
  ...
}

export default withDocumentTitle('Client Details')(ClientPage);

```

### With Redux compose

```JSX

export default compose(withRouter, withDocumentTitle('About Us'))(AboutPage);

```

### With connected React Redux components

```JSX

import { compose } from 'redux';
import { connect } from 'react-redux';
import withDocumentTitle from 'react-router-document-title';

class ClientPage extends React.Component {
  ...
}

const ConnectedClientPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withDocumentTitle('Client Details')
)(ClientPage);

export default ConnectedClientPage;

```

## Dynamic titles

Instead of passing a static string, you may pass a function that accepts the current location and component props as arguments. This means the handler does not need to live within the component itself and can be easily tested.


### Using pathname only

```JSX

import withDocumentTitle from 'react-router-document-title';

const getTitle = (pathname) => {
  if (pathname === '/calendar/day') return 'Day Calendar';
  if (pathname === '/calendar/week') return 'Week Calendar';
  if (pathname === '/calendar/month') return 'Month Calendar';

  return 'Calendar';
};

class CalendarPage extends React.Component {
  ...
}

export default withDocumentTitle(getTitle)(CalendarPage);

```


### Using pathname and props

You can also access your component's props for more advanced logic

```JSX

import withDocumentTitle from 'react-router-document-title';

const getTitle = (pathname, props) => {
  const { client } = props;

  if (pathname === '/client/create') return 'New Client';
  // Write the client's name
  if (client && pathname === `/client/${client.id}`)
    return `${client.name} Details`;

  return 'Client Details';
};

class ClientPage extends React.Component {
  ...
}

export default withDocumentTitle(getTitle)(ClientPage);

```


## Manually updating the title

An `updateDocumentTitle` prop is injected into your component if you need to manually trigger updates based on other logic. In this example the title will be "Client Details" while waiting for a fetch to complete, then it will display the client's name.

```TS
import { DocumentTitleProps } from 'react-router-document-title';

type Client = { name: string };
type OwnProps = { client: Client };
type Props = DocumentTitleProps & OwnProps;

const getTitle = (pathname: string, props: Props): string => {
  const { client } = props;

  if (client) return `${client.name}`;

  return 'Client Details';
}

class ClientPage extends React.Component<Props> {
  
  componentDidUpdate(prevProps) {
    const { client, updateDocumentTitle } = this.props;

    // When the client data arrives...
    if (!prevProps.client && client) {
      // Trigger an update (will resolve via getTitle)
      updateDocumentTitle();
      // Or... you could pass a new string manually
      updateDocumentTitle(`Ding! ${client.name}`);
    }
  }

  // Or change the title following an interaction
  handleClick = () => this.props.updateDocumentTitle('clicked!');

  render() {
    return (
      <button onClick={this.handleClick}>Update title</button>
    )
  }

  ...
}

export default withDocumentTitle(getTitle)(ClientPage);

```

## Configuration

| Arguments | type | description |
| --------- | ---- | ----------- |
| defaultTitle | string \| function | Simple string or function that returns a string to be shown in the browser tab. Function has signature `(pathname: string, props: P) => string` |
| ignoreLocation | boolean | If `true` will ignore updating the title when location changes (default `false`) |

<p>&nbsp;</p>

## Notes

Pull-requests welcome

<p>&nbsp;</p>

## License

MIT © [Nico Troia](https://nicotroia.com)
