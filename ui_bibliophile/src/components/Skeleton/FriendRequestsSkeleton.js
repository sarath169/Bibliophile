import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';

const FriendRequestsSkeleton = () => {
    return (
        <div>
            <Skeleton animation="wave" variant="rect" width={175} height={200} />
            &nbsp;
            <Skeleton animation="wave" variant="rect" width={175} height={40} />
            <Skeleton animation="wave" variant="rect" width={175} height={40} />
        </div>
    )
}

export default FriendRequestsSkeleton;
