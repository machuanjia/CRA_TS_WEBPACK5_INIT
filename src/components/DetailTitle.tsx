/*
 * @Author: lubenben
 * @Date: 2022-06-27 13:56:12
 * @LastEditors: lubenben
 * @LastEditTime: 2022-07-22 14:50:38
 */
import React, { useEffect, useState } from 'react'

import { OtterFormInput } from 'otter-pro'

import styles from './index.module.less'

const DetailTitle = (props: {
  title: string
  disabled?: boolean
  onSuccess: (title: string) => void
}) => {
  const { disabled, onSuccess } = props
  let { title } = props

  const [value, setValue] = useState(title)
  const [className, setClassName] = useState('titleInput')

  useEffect(() => {
    setValue(title)
  }, [title])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleBlur = (e) => {
    const newTitle = e.target.value

    if (!newTitle) {
      setClassName('errTitleInput')
      return
    }

    setClassName('titleInput')

    if (title !== newTitle) {
      onSuccess?.(e.target.value)
      title = newTitle
    }
  }

  return (
    <>
      <OtterFormInput
        className={`${styles[className]}`}
        value={value}
        disabled={disabled}
        maxLength={32}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="请输入标题"
      />
    </>
  )
}

export default DetailTitle
