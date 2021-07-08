import React, { ComponentClass, FunctionComponent, PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

export type DocumentTitleProps = {
  updateDocumentTitle: (title?: string) => void;
}
type OwnProps = {};
type Props = OwnProps & DocumentTitleProps & RouteComponentProps;
type State = {};

const withDocumentTitle = <P extends Readonly<Props>>(
  defaultTitle: string | ((location: string, props: P) => string),
  ignoreLocation = false
) => (
  WrappedComponent:
    | React.ComponentType<Props>
    | ComponentClass<Props>
    | FunctionComponent<Props>
): ComponentClass<Props, State> =>
  class DocumentTitleHelper extends PureComponent<Props, State> {
    componentDidMount(): void {
      this.handleTitle();
    }

    componentDidUpdate(prevProps: Props): void {
      const { location } = this.props;

      if (!ignoreLocation && location !== prevProps.location)
        this.handleTitle();
    }

    handleTitle = (_title?: string): void => {
      const { location } = this.props;

      const title =
        _title ||
        (typeof defaultTitle === 'function'
          ? defaultTitle(location.pathname, this.props as P)
          : defaultTitle);

      document.title = title;
    };

    render(): JSX.Element {
      return (
        <WrappedComponent {...this.props} updateDocumentTitle={this.handleTitle} />
      );
    }
  };

export default withDocumentTitle;
