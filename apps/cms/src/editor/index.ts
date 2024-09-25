import {
  AlignFeature,
  BlocksFeature,
  BoldFeature,
  FeatureProviderServer,
  HeadingFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { RichTextAdapterProvider } from 'payload'

export const baseHeadingFeature = HeadingFeature({
  enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5'],
})

export const baseEditorFeatures: FeatureProviderServer<any, any, any>[] = [
  ParagraphFeature(),
  AlignFeature(),
  BoldFeature(),
  ItalicFeature(),
  UnderlineFeature(),
  StrikethroughFeature(),
  InlineCodeFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  SuperscriptFeature(),
  SubscriptFeature(),
  InlineToolbarFeature(),
]

export const getDefaultEditor = () =>
  lexicalEditor({
    features: [...baseEditorFeatures, baseHeadingFeature],
  }) as unknown as RichTextAdapterProvider<{}, any, any>
