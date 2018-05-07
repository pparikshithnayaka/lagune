import { fetchAuthorizationUrl } from '@/actions/login';
import UsernameForm, { Props } from '@/features/login/components/username_form';
import { RootState } from '@/reducers';
import { injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state: RootState) => ({
  isSubmitting: state.login.is_submitting,
  isSubmitted: state.login.is_submitted,
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  onSubmit (host: string) {
    dispatch(fetchAuthorizationUrl(host));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter<Props>(injectIntl<Props>(UsernameForm)));
