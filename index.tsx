import React, { ComponentClass, FunctionComponent, PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

type PageTitleProps = {
  updateTitle: (title?: string) => void;
}
type OwnProps = {};
type Props = OwnProps & PageTitleProps & RouteComponentProps;
type State = {
  timeout: number;
};

const withDocumentTitle = <P extends Readonly<Props>>(
  defaultTitle: string | ((location: string, props: P) => string),
  ignoreLocation = false
) => (
  WrappedComponent:
    | React.ComponentType<Props>
    | ComponentClass<Props>
    | FunctionComponent<Props>
): ComponentClass<Props, State> =>
  class PageTitleHelper extends PureComponent<Props, State> {
    state = {
      timeout: 0,
    };

    componentDidMount(): void {
      this.handlePageTitle();
    }

    componentDidUpdate(prevProps: Props): void {
      const { location } = this.props;

      // Handle browser back/forward navigation
      if (!ignoreLocation && location !== prevProps.location)
        this.handlePageTitle();
    }

    handlePageTitle = (_title?: string): void => {
      const { location } = this.props;

      const title =
        _title ||
        (typeof defaultTitle === 'function'
          ? defaultTitle(location.pathname, this.props as P)
          : defaultTitle);

      // Update title
      document.title = title;
    };

    render(): JSX.Element {
      return (
        <WrappedComponent {...this.props} updateTitle={this.handlePageTitle} />
      );
    }
  };

export default withDocumentTitle;
