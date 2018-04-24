import { connect } from 'react-redux';
// import { RootState } from '@/reducers';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import { verifyCode } from '@/actions/login';
import CodeForm, { Props } from '@/features/login/components/code_form';

const mapDispatchToProps = (dispatch: Dispatch<void>) => ({
  onSubmit (code: string) {
    dispatch(verifyCode({ code }));
  },
});

export default withRouter<Props>(connect(
  null,
  mapDispatchToProps,
)(CodeForm));
