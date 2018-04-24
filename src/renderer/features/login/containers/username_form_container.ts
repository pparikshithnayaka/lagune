import { connect } from 'react-redux';
import { RootState } from '@/reducers';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import { fetchLoginUrl } from '@/actions/login';
import UsernameForm, { Props } from '@/features/login/components/username_form';

const mapStateToProps = (state: RootState) => ({
  isSubmitting: state.login.is_submitting,
  isSubmitted: state.login.is_submitted,
});

const mapDispatchToProps = (dispatch: Dispatch<void>) => ({
  onSubmit (host: string) {
    dispatch(fetchLoginUrl({ host }));
  },
});

export default withRouter<Props>(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsernameForm));
