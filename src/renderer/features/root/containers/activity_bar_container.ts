import { connect } from 'react-redux';
import { RootState } from '@/reducers';
import ActivityBar from '@/features/root/components/activity_bar';

const mapStateToProps = (_: RootState) => ({
  me: '1', // fix
});

export default connect(
  mapStateToProps,
)(ActivityBar);
