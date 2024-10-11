version=$1
tag=v$version
IFS="." read -r -a ver_array <<< "$version"
major=${ver_array[0]}
minor=${ver_array[1]}
patch=${ver_array[2]}

reldir=${major}/${minor}/${patch}
mkdir -p $reldir
git archive $tag | tar -x -C $reldir
git add $reldir

rm -f latest.js
echo "export * from \"./$reldir/theme.js\";" >> latest.js
echo "export * from \"./$reldir/epcc.js\";" >> latest.js
git add latest.js
