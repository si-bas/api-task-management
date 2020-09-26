import { classToPlain, Exclude } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({
  name: 'users',
})
@Unique(['username', 'email'])
export class UserEntity extends BaseEntity {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  static passwordMinLength: number = 8;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'username' })
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'password' })
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  salt: string;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  passwordHash(): void {
    this.salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, this.salt);
  }

  validatePassword(password: string): boolean {
    const hash = bcrypt.hashSync(password, this.salt);
    return hash === this.password;
  }

  toJSON(): any {
    return classToPlain(this);
  }
}
