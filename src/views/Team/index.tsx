/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 15:09:45
 * @LastEditTime: 2022-06-15 11:21:00
 * @FilePath: /main/src/views/Team/index.tsx
 * @Description:
 */
import { useEffect, useState } from "react";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useMount } from "ahooks";
import { Button, Input, message, Switch } from "antd";
import {
  ContentLayout,
  Icon,
  OtterTable,
  OtterTableActionDelete,
  OtterTableActions,
  OtterTableFieldCreator,
  OtterTableFieldDate,
  OtterTableFieldDescription,
  OtterTableFieldTitle,
  OtterTableTitle,
  Text,
} from "otter-pro";
import { useDeleteConfirm } from "otter-pro/es/hooks";
import { ut } from "otter-pro/es/i18n";

import type { ITeam } from "@/interfaces";
import { useAppModel, useTeamModel, useTeamService } from "@/models";

import TeamCollection from "./components/Collection";
import TeamDetail from "./components/Detail";
import { TeamContext } from "./context";

const { Search } = Input;
const Team = () => {
  const { t } = ut();
  const [isTeamCollectionVisible, setIsTeamCollectionVisible] = useState(false);
  const [isTeamDetailVisible, setIsTeamDetailVisible] = useState(false);
  const [teamId, setTeamId] = useState(null);
  const [activeTeam, setActiveTeam] = useState("");
  const { getTeamsService, deleteTeamService } = useTeamService();
  const { list, page, pageSize, loading, total } = useTeamModel();
  const { info } = useAppModel();
  const [DeleteConfirm] = useDeleteConfirm();
  const [searchText, setSearchText] = useState("");

  useMount(() => {
    getTeamsService({
      page,
      page_size: pageSize,
    });
  });

  useEffect(() => {
    const current = localStorage.getItem("activeTeam");
    if (current) {
      setActiveTeam(current);
    }
  }, []);

  const onSearch = (val) => {
    setSearchText(val);
  };

  const handleCreate = () => {
    setIsTeamCollectionVisible(true);
  };

  const handleSetting = (id: string) => {
    setTeamId(id);
    setIsTeamDetailVisible(true);
  };

  const handleDelete = (entity: ITeam) => {
    DeleteConfirm({
      content: t("team.msg.delete", { title: entity.title }),
      handleOk: async () => {
        const [err] = await deleteTeamService(entity.id);
        if (err) {
          message.error(t("team.msg.deleteFailed") as any);
        } else {
          message.success(t("team.msg.deleteSuccess") as any);
        }
      },
    });
  };

  const Actions = () => {
    return (
      <div className="flex flex-row items-center">
        <Search
          className="search mr-2"
          enterButton={<SearchOutlined />}
          defaultValue={searchText}
          placeholder={t("common.placeholder.title")}
          onSearch={onSearch}
        />
        <Button className="icon-center" type="primary" onClick={handleCreate}>
          <>
            <PlusOutlined />
            {t("common.actions.create")}
          </>
        </Button>
      </div>
    );
  };

  const handleStatus = (id) => {
    localStorage.setItem("activeTeam", id);
    setActiveTeam(id);
  };

  const pageChange = (p, ps) => {
    getTeamsService({
      page: p,
      page_size: ps,
    });
  };

  const columns = [
    {
      title: t("common.list.title"),
      dataIndex: "title",
      key: "title",
      width: 200,
      render: (text: string) => {
        return (
          <div className="min-width-150">
            <OtterTableFieldTitle title={text} />
          </div>
        );
      },
    },
    {
      title: t("common.list.description"),
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (text: string) => {
        return <OtterTableFieldDescription description={text} />;
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 300,
      render: (text: string) => {
        return <Text type="info">{text}</Text>;
      },
    },
    {
      title: t("common.list.creator"),
      dataIndex: "creator",
      key: "creator",
      width: 180,
      render: (text: string, record: any) => {
        return (
          <OtterTableFieldCreator
            name={record?.create_operation?.creator?.name}
          />
        );
      },
    },
    {
      title: t("common.list.createTime"),
      dataIndex: "create_time",
      key: "create_time",
      width: 180,
      render: (text: string, record: any) => {
        return (
          <OtterTableFieldDate date={record?.create_operation?.create_time} />
        );
      },
    },
    {
      title: t("common.list.status"),
      dataIndex: "active",
      key: "active",
      width: 70,
      render: (text: string, record: any) => {
        return (
          <Switch
            checked={record.id === activeTeam}
            onChange={() => {
              handleStatus(record.id);
            }}
          />
        );
      },
    },
    {
      title: t("common.list.actions"),
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (text: string, record: any) => {
        return (
          <OtterTableActions>
            <Text
              type="primaryLink"
              onClick={() => {
                handleSetting(record.id);
              }}
            >
              <Icon className="mr-1" name="setting" />
              设置
            </Text>
            {!record.is_default &&
              record.create_operation.creator.id === info.id &&
              record.id !== activeTeam && (
                <OtterTableActionDelete
                  onDelete={() => {
                    handleDelete(record);
                  }}
                />
              )}
          </OtterTableActions>
        );
      },
    },
  ];

  return (
    <TeamContext.Provider
      value={{
        isTeamCollectionVisible,
        setIsTeamCollectionVisible,
        teamId,
        setTeamId,
        isTeamDetailVisible,
        setIsTeamDetailVisible,
      }}
    >
      <ContentLayout
        hLeft={<OtterTableTitle title={t("team.name")} count={total} />}
        hRight={<Actions />}
      >
        <OtterTable
          loading={loading}
          dataSource={list}
          columns={columns}
          total={total}
          onPaginationChange={pageChange}
        />
        <TeamCollection />
        <TeamDetail />
      </ContentLayout>
    </TeamContext.Provider>
  );
};
export default Team;
