import { fetchAccount } from '@/actions/accounts';
import AccountToggleButton, { Props } from '@/features/root/components/account_toggle_button';
import { RootState } from '@/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState, ownProps: Props) => ({
  account: state.accounts.get(ownProps.accountId),
});

const mapDispatchToProps = () => ({
  fethcAccount (id: string) {
    return fetchAccount(id);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountToggleButton);
