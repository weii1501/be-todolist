import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import {
  IsNotEmpty,
  Length,
  IsOptional,
  IsDateString,
  ValidateIf,
} from "class-validator";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(1, 80)
  name: string;

  @Column({ type: "date", nullable: true })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @Column({ type: "date", nullable: true })
  @ValidateIf((o) => o.startDate !== undefined)
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @BeforeInsert()
  @BeforeUpdate()
  validateDates() {
    if (this.endDate && !this.startDate) {
      throw new Error("Start date must be present if there is an end date");
    }
  }
}
