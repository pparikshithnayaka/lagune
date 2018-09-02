import { AccountToggle } from '@/renderer/features/root/components/account_toggle';
import { RootState } from '@/renderer/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  me: state.activeAccount,
  accountIds: state.database.get('verified_accounts', []).map((account) => account.get('id')),
});

export default connect(mapStateToProps)(AccountToggle);
