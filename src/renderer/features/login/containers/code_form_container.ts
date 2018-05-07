import { verifyCode } from '@/actions/login';
import CodeForm, { Props } from '@/features/login/components/code_form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default connect(
  null,
  { onSubmit: verifyCode },
)(withRouter<Props>(CodeForm));
