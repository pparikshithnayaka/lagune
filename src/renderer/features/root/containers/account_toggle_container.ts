import { AccountToggle } from '@/renderer/features/root/components/account_toggle';
import { RootState } from '@/renderer/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  me: state.get('activeAccount', undefined),
  accounts: state.getIn(['database', 'verified_accounts']),
});

export default connect(mapStateToProps)(AccountToggle);
