<div align="center">
  <h1>react-router-document-title</h1>
  
  <div>Composable HOC for quickly updating `document.title`</div>
</div>

## Installation

```
npm install --save react-router-document-title
```

## Usage

Just wrap your top-level router components with the `withDocumentTitle` higher-order component. The component will update the page title on mount and when the router location updates. (So this assumes your component receives react-router `RouteComponentProps` such as location and history.)

```
withDocumentTitle('About Us')(AboutPage)
```

<span>or</span>

```
withDocumentTitle(getTitle)(AboutPage)
```

<p>&nbsp;</p>

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

Instead of passing a static string, you may pass a function that accepts the current location and component props as arguments. This means the handler does not need to live within the component itself.


### Using pathname only

```JSX

import withDocumentTitle from 'react-router-document-title';

const getTitle = (pathname: string): string => {
  if (pathname === '/calendar/day') return 'Day Calendar';
  if (pathname === '/calendar/week') return 'Week Calendar';
  if (pathname === '/calendar/month') return 'Month Calendar';
  if (pathname === URLS.createCalendarEvent) return 'Create Event';

  return 'Calendar';
};

class CalendarPage extends React.Component {
  ...
}

export default withDocumentTitle(getTitle)(CalendarPage);

```


### Using pathname and props

```JSX

import withDocumentTitle from 'react-router-document-title';

type Props = {...};

const getTitle = (pathname: string, props: Props): string => {
  if (pathname === '/client/edit') return 'Edit Client';
  if (pathname === `/client/${props.clientId}` && props.client)
    return `${client.name} Details`;

  return 'Client Details';
};

class ClientPage extends React.Component {
  ...
}

export default withDocumentTitle(getTitle)(ClientPage);

```

<p>&nbsp;</p>

## Configuration

| Arguments | type | description |
| --------- | ---- | ----------- |
| defaultTitle | string \| function | Simple string OR function with signature `(pathname: string, props: P) => string` |
| ignoreLocation | boolean | If `true` will ignore updating the title when location changes (default `false`) |

<p>&nbsp;</p>

## Notes

Pull-requests welcome

<p>&nbsp;</p>

## License

MIT © [Nico Troia](https://nicotroia.com)
