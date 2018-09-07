import UsernameForm from '@/renderer/pages/login/components/username_form';
import { fetchAuthorizationUrl } from '@/renderer/features/login/actions';
import { RootState } from '@/renderer/store/reducers';
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
