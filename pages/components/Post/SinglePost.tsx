import React, { FC } from 'react'
import { PostType } from '../../types'

const SinglePost: FC<PostType> = ({title, description, date, tag, slug}) => {
  return (
    <div>SinglePost</div>
  )
}

export default SinglePost