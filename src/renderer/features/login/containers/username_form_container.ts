import { fetchAuthorizationUrl } from '@/renderer/actions/login';
import UsernameForm from '@/renderer/features/login/components/username_form';
import { RootState } from '@/renderer/reducers';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state: RootState) => ({
  isSubmitting: state.getIn(['login', 'is_submitting']),
  isSubmitted: state.getIn(['login', 'is_submitted']),
});

export default connect(
  mapStateToProps,
  { onSubmit: fetchAuthorizationUrl },
)(withRouter(injectIntl(UsernameForm)));
