import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      comments ()
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE comments `;
}
