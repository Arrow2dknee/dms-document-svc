import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Folder } from '../../folders/schemas/folders.schema';
import { Permission } from '../../common/enums/permissions.enum';

export type FileDocument = HydratedDocument<File>;

@Schema({
  timestamps: true,
})
export class File {
  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  extension: string;

  @Prop({ type: String, default: null })
  content: string;

  @Prop({ type: String, default: Permission.Execute })
  permissions: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Folder', default: null })
  folderId: Folder;

  @Prop({ type: String, default: null })
  userId: string; // Relation user -> file
}

export const FileSchema = SchemaFactory.createForClass(File);
