import { connect } from 'react-redux';
import { RootState } from '@/reducers';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { fetchLoginUrl } from '@/actions/login';
import UsernameForm, { Props } from '@/features/login/components/username_form';

const mapStateToProps = (state: RootState) => ({
  isSubmitting: state.login.is_submitting,
  isSubmitted: state.login.is_submitted,
});

export default connect(
  mapStateToProps,
  { onSubmit: fetchLoginUrl },
)(withRouter<Props>(injectIntl<Props>(UsernameForm)));
