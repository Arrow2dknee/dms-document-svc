import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Permission } from '../../common/enums/permissions.enum';

export type FolderDocument = HydratedDocument<Folder>;

@Schema({
  timestamps: true,
})
export class Folder {
  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, enum: Permission, default: Permission.Execute })
  permissions: Permission;

  @Prop({ type: String, default: null })
  userId: string; // Relation user -> folder

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Folder', default: null })
  folderId: Folder;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
