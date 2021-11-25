import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';

const BookSkeleton = () => {
    return (
        <div>
            <Skeleton animation="wave" variant="circle" width={200} height={200} />
            &nbsp;
            <Skeleton animation="wave" variant="rect" width={200} height={100} />
            &nbsp;
            <Skeleton animation="wave" variant="rect" width={200} height={40} />
        </div>
    )
}

export default BookSkeleton
