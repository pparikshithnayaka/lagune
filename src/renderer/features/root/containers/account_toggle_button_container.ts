import { fetchAccount } from '@/actions/accounts';
import AccountToggleButton, { Props } from '@/features/root/components/account_toggle_button';
import { RootState } from '@/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState, ownProps: Props) => ({
  account: state.accounts[ownProps.accountId],
});

export default connect(
  mapStateToProps,
  { fetchAccount },
)(AccountToggleButton);
