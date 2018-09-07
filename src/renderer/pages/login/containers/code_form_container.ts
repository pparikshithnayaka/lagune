import CodeForm, { Props } from '@/renderer/pages/login/components/code_form';
import { verifyCode } from '@/renderer/features/login/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default connect(
  null,
  { onSubmit: verifyCode },
)(withRouter<Props>(CodeForm));
