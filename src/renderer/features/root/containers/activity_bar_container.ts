import ActivityBar from '@/features/root/components/activity_bar';
import { RootState } from '@/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (_: RootState) => ({
  me: '1', // fix
});

export default connect(
  mapStateToProps,
)(ActivityBar);
