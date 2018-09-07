import { AccountToggle } from '@/renderer/pages/root/components/account_toggle';
import { RootState } from '@/renderer/store/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  me: state.get('activeAccount', undefined),
  accounts: state.getIn(['database', 'verified_accounts']),
});

export default connect(mapStateToProps)(AccountToggle);
