/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2014/7/12 16:42:12                           */
/*==============================================================*/


drop table if exists T_USER;

/*==============================================================*/
/* Table: T_USER                                                */
/*==============================================================*/
create table T_USER
(
   u_id                 int not null auto_increment,
   u_name               varchar(255),
   cert                 varchar(255),
   grp_id               integer,
   role_id              integer,
   status               integer,
   add1                 varchar(255),
   add2                 varchar(255),
   primary key (u_id)
);

insert into t_user (u_id,u_name,cert,grp_id,role_id,status) values (1,'admin','cst',1,1,1);
insert into t_user (u_id,u_name,cert,grp_id,role_id,status) values (2,'xx','123456',1,1,1);

