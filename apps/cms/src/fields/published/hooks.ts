import { FieldHook } from 'payload'

export const publishedAtBeforeChange: FieldHook = ({ siblingData, value }) =>
  siblingData._status === 'published' && !value ? new Date() : value

export const publishedByBeforeChange: FieldHook = ({ value, operation, req: { user } }) => {
  if (operation === 'create' && user) value = user?.id

  return value
}

export const lastPublishedByBeforeChange: FieldHook = ({ value, operation, req: { user } }) => {
  if (['create', 'update'].includes(operation || '') && user) value = user?.id

  return value
}
