#!/bin/sh

# 定义变量，当前分支
CURRENT_BRANCH=$(git symbolic-ref --short -q HEAD)

# 定义变量，commit的备注信息
COMMIT_MSG=$1;

function checkGitStatus {
  echo
    STR1="nothing to commit, working tree clean"
    STR2="no changes added to commit"
    STR3="Changes not staged for commit"
    STR4="Changes to be committed"
    STR5="both modified: "
    STR6="Untracked files:"
    CONFLICTS="conflicts" #冲突
    ERROR="error:" #错误
    FATAL="fatal:" #致命的错误
    OUTTYPE=-1
    out=$(git status)

echo "\033[32m ---------------我是分割线1--------------- \033[0m"
    echo $OUTTYPE
    echo "\033[32m ---------------我是分割线2--------------- \033[0m"
    result=$(echo $out | grep "$STR5")
    if [[ "$result" != "" ]];then
        OUTTYPE=5
    fi
    if [ "$OUTTYPE" == "-1" ];then
        result=$(echo $out | grep "$STR1")
        if [[ "$result" != "" ]];then
            OUTTYPE=1
        fi
    fi
    if [ "$OUTTYPE" == "-1" ];then
        result=$(echo $out | grep "$STR6")
        if [[ "$result" != "" ]];then
            OUTTYPE=6
        fi
    fi
    if [ "$OUTTYPE" == "-1" ];then
        result=$(echo $out | grep "$STR2")
        if [[ "$result" != "" ]];then
            OUTTYPE=2
        fi
    fi
    if [ "$OUTTYPE" == "-1" ];then
        result=$(echo $out | grep "$STR3")
        if [[ "$result" != "" ]];then
            OUTTYPE=3
        fi
    fi
    if [ "$OUTTYPE" == "-1" ];then
        result=$(echo $out | grep "$STR4")
        if [[ "$result" != "" ]];then
            OUTTYPE=4
        fi
    fi
    if [ "$OUTTYPE" == "-1" ];then
        result=$(echo $out | grep "$STR5")
        if [[ "$result" != "" ]];then
            OUTTYPE=5
        fi
    fi
    if [ "$OUTTYPE" == "1" ];then
        git status
        echo -e "\033[32m拉取远程代码：git pull origin $CURRENT_BRANCH\033[0m"

        ret=$(git pull origin $CURRENT_BRANCH)
        result=$(echo $ret | grep "$CONFLICTS")
        if [[ "$result" != "" ]];then
            rm -rf report.*
            echo -e "\033[31m发现冲突！第一步手动解决冲突，第二步执行：git commit -a -m "\'备注\'"\033[0m"
            echo -e "\033[31m▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼冲突文件开始▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼\033[0m"
            git --no-pager diff --check
            echo -e "\033[31m▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲冲突文件结束▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲\033[0m"
            exit 2
        fi
        echo -e "\033[32m推送至远程：git push -u origin $CURRENT_BRANCH\033[0m"
        rm -rf report.*
        git push -u origin $CURRENT_BRANCH
        echo -e "\033[32m查询当前状态：git status\033[0m"
        git status
        echo -e "\033[32m完成上传，退出脚本\033[0m"
        exit 2
    elif [ "$OUTTYPE" = "2" ]||[ "$OUTTYPE" = "6" ];then #
        git status
        echo -e "\033[32m提交到暂存区：git add -A\033[0m"
        git add -A
    elif [ "$OUTTYPE" = "3" ];then
        git status
        echo -e "\033[32m提交到暂存区：git add -A\033[0m"
        git add -A
    elif [ "$OUTTYPE" = "4" ];then
        if [ -n "$COMMIT_MSG" ]; then
            echo -e "\033[32m暂存区提交到本地版本库：git commit -m \033[0m"
            result=$(git commit -m "commit：$COMMIT_MSG")
            if [[ "$result" == "" ]];then
              rm -rf report.*
              echo -e "\033[31m有错误，退出手动解决\033[0m"
              exit 2
            fi
        else
            echo -e "\033[32m暂存区提交到本地版本库：git commit -m 备注，请输入备注\033[0m"
            read commitStr
            result=$(git commit -m "commit：$commitStr")
            if [[ "$result" == "" ]];then
                rm -rf report.*
                echo -e "\033[31m有错误，退出手动解决\033[0m"
                exit 2
            fi
        fi

    elif [ "$OUTTYPE" = "5" ];then
        rm -rf report.*
        echo -e "\033[31m发现冲突！第一步手动解决冲突，第二步执行：git commit -a -m "\'备注\'"\033[0m"
        echo -e "\033[31m▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼冲突文件开始▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼\033[0m"
        git --no-pager diff --check
        echo -e "\033[31m▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲冲突文件结束▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲\033[0m"
        exit 2
    fi
}

while true;
do
    checkGitStatus
done
