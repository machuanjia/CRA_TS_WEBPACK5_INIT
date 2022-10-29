/*
 * @Author: lubenben
 * @Date: 2022-06-27 13:56:12
 * @LastEditors: lubenben
 * @LastEditTime: 2022-07-22 15:11:38
 */
import React, { useEffect, useState } from 'react'

import { OtterFormTextArea, Text } from 'otter-pro'

import styles from './index.module.less'

const DetailDescription = (props: {
  disabled?: boolean
  description: string
  onSuccess: (description: string) => void
}) => {
  const { disabled, onSuccess } = props
  let { description } = props

  const [value, setValue] = useState(description)

  useEffect(() => {
    setValue(description)
  }, [description])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleBlur = (e) => {
    const newDescription = e.target.value

    if (newDescription !== description) {
      onSuccess?.(e.target.value)
      description = newDescription
    }
  }

  return (
    <>
      <Text className={styles.alignText} type="info">
        描述
      </Text>
      <OtterFormTextArea
        className={styles.descriptionTextArea}
        value={value}
        disabled={disabled}
        autoSize={true}
        maxLength={256}
        placeholder="请输入描述"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  )
}

export default DetailDescription
