import { verifyCode } from '@/renderer/actions/login';
import CodeForm, { Props } from '@/renderer/features/login/components/code_form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default connect(
  null,
  { onSubmit: verifyCode },
)(withRouter<Props>(CodeForm));
